import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // First, verify the user with anon client
    const supabaseAnon = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: { headers: { Authorization: authHeader } },
      }
    );

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabaseAnon.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role client to add the host role
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user already has host role
    const { data: existingRole, error: checkError } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .eq('role', 'host')
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing role:', checkError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to check existing role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (existingRole) {
      // User already has host role
      return new Response(
        JSON.stringify({ success: true, message: 'Already a host' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Add host role to user
    const { error: insertError } = await supabaseAdmin
      .from('user_roles')
      .insert({ user_id: user.id, role: 'host' });

    if (insertError) {
      console.error('Error inserting host role:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to add host role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully became a host' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
