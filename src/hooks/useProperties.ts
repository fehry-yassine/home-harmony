import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getPublishedProperties, 
  searchProperties, 
  getProperty,
  getHostProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  togglePropertyStatus,
  trackPropertyView,
  PropertyWithImages,
  SearchFilters 
} from '@/services/propertyService';
import { useAuth } from '@/contexts/AuthContext';

export function usePublishedProperties() {
  return useQuery({
    queryKey: ['properties', 'published'],
    queryFn: getPublishedProperties,
  });
}

export function useSearchProperties(filters: SearchFilters) {
  return useQuery({
    queryKey: ['properties', 'search', filters],
    queryFn: () => searchProperties(filters),
    enabled: Object.keys(filters).length > 0,
  });
}

export function useProperty(id: string | null) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id!),
    enabled: !!id,
  });

  // Track view when property is loaded
  useEffect(() => {
    if (id && query.data) {
      trackPropertyView(id, user?.id);
    }
  }, [id, query.data, user?.id]);

  return query;
}

export function useHostProperties() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['properties', 'host', user?.id],
    queryFn: () => getHostProperties(user!.id),
    enabled: !!user?.id,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ 
      property, 
      imageUrls, 
      coverIndex 
    }: { 
      property: Parameters<typeof createProperty>[0]; 
      imageUrls: string[]; 
      coverIndex?: number;
    }) => createProperty({ ...property, owner_id: user!.id }, imageUrls, coverIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      updates, 
      imageUrls, 
      coverIndex 
    }: { 
      id: string; 
      updates: Parameters<typeof updateProperty>[1]; 
      imageUrls?: string[]; 
      coverIndex?: number;
    }) => updateProperty(id, updates, imageUrls, coverIndex),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', data.id] });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useTogglePropertyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, currentStatus }: { id: string; currentStatus: string }) => 
      togglePropertyStatus(id, currentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}
