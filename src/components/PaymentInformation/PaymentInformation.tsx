// src/features/form/PaymentInformation.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setPaymentMethod,
  setNumberOfTickets,
  setProfilePicture,
} from '@/store/formSlice';

export const PaymentInformation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { paymentMethod, numberOfTickets } = useSelector(
    (state: RootState) => state.form
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(setProfilePicture(e.target.files[0]));
    }
  };

  return (
    <form>
      <div>
        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={e =>
              dispatch(
                setPaymentMethod(
                  e.target.value as 'Credit Card' | 'PayPal' | 'Bank Transfer'
                )
              )
            }
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Number of Tickets:
          <input
            type="range"
            min="1"
            max="10"
            value={numberOfTickets}
            onChange={e => dispatch(setNumberOfTickets(Number(e.target.value)))}
          />
        </label>
      </div>
      <div>
        <label>
          Profile Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
      </div>
    </form>
  );
};
