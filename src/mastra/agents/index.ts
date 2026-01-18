// =============================================================================
// TODO: Export Your Agents
// =============================================================================
//
// This is a barrel file that re-exports all agents from this folder.
// It makes importing cleaner throughout your application.
//
// =============================================================================
// WHY USE A BARREL FILE?
// =============================================================================
//
// Instead of:
//   import { fitnessCoach } from '@/mastra/agents/fitness-coach';
//   import { nutritionCoach } from '@/mastra/agents/nutrition-coach';
//
// You can do:
//   import { fitnessCoach, nutritionCoach } from '@/mastra/agents';
//
// =============================================================================
// HOW TO IMPLEMENT
// =============================================================================
//
// Simply re-export your agent:
//
//   export { fitnessCoach } from './fitness-coach';
//
// If you add more agents later:
//
//   export { fitnessCoach } from './fitness-coach';
//   export { nutritionCoach } from './nutrition-coach';
//   export { yogaInstructor } from './yoga-instructor';
//
// =============================================================================
