// src/features/form/EventPreferences.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setTicketType,
  setDietaryRestrictions,
  setEventDate,
} from '@/store/formSlice';

export const EventPreferences: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ticketType, dietaryRestrictions, eventDate } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <div>
      <h2>Event Preferences</h2>
      <form>
        <div>
          <label>
            Ticket Type:
            <select
              value={ticketType}
              onChange={e =>
                dispatch(
                  setTicketType(
                    e.target.value as 'VIP' | 'Standard' | 'Economy'
                  )
                )
              }
            >
              <option value="VIP">VIP</option>
              <option value="Standard">Standard</option>
              <option value="Economy">Economy</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Dietary Restrictions:
            <input
              type="text"
              value={dietaryRestrictions}
              onChange={e => dispatch(setDietaryRestrictions(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Event Date:
            <input
              type="date"
              value={eventDate}
              onChange={e => dispatch(setEventDate(e.target.value))}
            />
          </label>
        </div>
      </form>
    </div>
  );
};
