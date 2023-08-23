type DayData = {
  id: number, completion: "zero" | "partial" | "full", completed_at?: number,
  created_at: number, progression_assignments: {
    id: number, reps: number, sets: number, weight: number, rpe?: number,
    progression: { id: number, name: string, movement: { slug: string }},
    completed_sets: { id: number, reps: number, weight: number }[]
  }[]
}

type Plan = {
  id?: number, name: string,
  days: { progressions: { id: number, name: string, movement: { slug: string } }[] }[]
}

type NewPlan = {
  name: string, days: { progression_ids: number[], progressions: { name: string, movement: { slug: string} }[] }[]
}

type Movement = { id: number, slug: string };

type Progression = {
  id: number, initial_reps: number, initial_sets: number, initial_weight: number,
  max_reps: number, max_sets: number, min_reps: number, min_sets: number,
  name: string, rep_increments: number, set_increments: number, weight_increments: number,
  movement: Movement
}
