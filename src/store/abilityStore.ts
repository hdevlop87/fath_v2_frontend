import {create} from 'zustand';
import { createMongoAbility } from '@casl/ability';

export const useAbilityStore = create(set => ({
  ability: createMongoAbility([]), // Initialize with an empty rule set
  setAbility: (rules) => set(state => {
    state.ability.update(rules);
  }),
}));