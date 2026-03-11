/* ========================================
   Supabase Configuration for PT PMP Gallery
   ======================================== */
var SUPABASE_URL = 'https://hlpulsseqeqcfzqsoypg.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscHVsc3NlcWVxY2Z6cXNveXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDU5NTksImV4cCI6MjA4ODgyMTk1OX0.Uu7ZxtdZF3cuyQAiN45zxjKA9nw6FeebJpny6OAGqxA';

// Initialize Supabase client
var _supaClient = null;
function getSupabase() {
  if (!_supaClient && window.supabase) {
    _supaClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supaClient;
}

// Storage helpers
function getStoragePublicUrl(filePath) {
  return SUPABASE_URL + '/storage/v1/object/public/gallery/' + filePath;
}
