// lib/posthog.js
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init('phc_n0BMNT2D8P6jEct1ozngyFHUWJ9dk2vYm9e9lqk3Sy5', { 
    api_host: 'https://app.posthog.com',
     person_profiles: 'identified_only'
  });
}

export default posthog;
