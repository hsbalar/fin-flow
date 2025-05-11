import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUniqueId } from '@/lib/utils'

export interface Card {
  id: string
  dashboardId?: string
  name: string
  type: 'Section' | 'Chart'
  chartType?: 'Bar' | 'Pie'
  sheets: string[]
}

export interface CardState {
  cards: Card[]
}

const defaultCardState: CardState = {
  cards: [],
}

const cardSlice = createSlice({
  name: 'card',
  initialState: defaultCardState,
  reducers: {
    createCard: (state: CardState, action) => {
      const newCard: Card = {
        id: getUniqueId(),
        ...action.payload,
      }
      state.cards.push(newCard)
    },
    deleteCard: (state: CardState, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload)
    },
    updateCard: (state: CardState, action: PayloadAction<Partial<Card> & { id: string }>) => {
      const index = state.cards.findIndex((card) => card.id === action.payload.id)
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...action.payload }
      }
    },
  },
})

export const { createCard, deleteCard, updateCard } = cardSlice.actions

export default cardSlice.reducer
