import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getUserFavorites, 
  getFavoriteIds, 
  toggleFavorite 
} from '@/services/favoriteService';
import { useAuth } from '@/contexts/AuthContext';

export function useFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: () => getUserFavorites(user!.id),
    enabled: !!user?.id,
  });
}

export function useFavoriteIds() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favoriteIds', user?.id],
    queryFn: () => getFavoriteIds(user!.id),
    enabled: !!user?.id,
    initialData: [],
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (propertyId: string) => toggleFavorite(user!.id, propertyId),
    onMutate: async (propertyId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['favoriteIds', user?.id] });

      // Snapshot previous value
      const previousIds = queryClient.getQueryData<string[]>(['favoriteIds', user?.id]);

      // Optimistically update
      queryClient.setQueryData<string[]>(['favoriteIds', user?.id], (old = []) => {
        if (old.includes(propertyId)) {
          return old.filter(id => id !== propertyId);
        }
        return [...old, propertyId];
      });

      return { previousIds };
    },
    onError: (err, propertyId, context) => {
      // Rollback on error
      queryClient.setQueryData(['favoriteIds', user?.id], context?.previousIds);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['favoriteIds', user?.id] });
    },
  });
}
