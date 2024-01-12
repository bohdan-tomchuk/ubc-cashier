const mockChecks = [
  {
    id: 1, 
    date: new Date(2021, 1, 1).toISOString(), 
    products: [
      { id: 1, name: 'Латте', price: 14, quantity: 1 },
      { id: 2, name: 'Еспрессо', price: 10, quantity: 2 },
      { id: 3, name: 'Капучіно', price: 69, quantity: 3 },
      { id: 4, name: 'Фільтр', price: 56, quantity: 4 },
      { id: 5, name: 'Бутрик', price: 48, quantity: 5 },
    ]
  },
  {
    id: 2, 
    date: new Date(2021, 1, 2).toISOString(), 
    products: [
      { id: 4, name: 'Фільтр', price: 56, quantity: 4 },
      { id: 5, name: 'Бутрик', price: 48, quantity: 5 },
      { id: 6, name: 'Чай', price: 84, quantity: 6 },
      { id: 8, name: 'Какао', price: 18, quantity: 8 }
    ]
  },
  {
    id: 3, 
    date: new Date(2021, 1, 3).toISOString(), 
    products: [
      { id: 1, name: 'Латте', price: 14, quantity: 1 },
      { id: 2, name: 'Еспрессо', price: 10, quantity: 2 },
      { id: 8, name: 'Какао', price: 18, quantity: 8 }
    ]
  },
]

export default mockChecks