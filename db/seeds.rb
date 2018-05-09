
t1 = Thinker.create(id: Thinker.all.length, name: "Plato")
t2 = Thinker.create(id: Thinker.all.length, name: "Aristotle")
t3 = Thinker.create(id: Thinker.all.length, name: "Plotinus")
t4 = Thinker.create(id: Thinker.all.length, name: "Boethius")
t5 = Thinker.create(id: Thinker.all.length, name: "Descartes")
t6 = Thinker.create(id: Thinker.all.length, name: "Leibniz")
t7 = Thinker.create(id: Thinker.all.length, name: "Hume")
t8 = Thinker.create(id: Thinker.all.length, name: "Kant")
t9 = Thinker.create(id: Thinker.all.length, name: "Hegel")
t10 = Thinker.create(id: Thinker.all.length, name: "Nietzsche")

user = User.create!(email: "testo@gmail.com", password: "secret")

shelf = Shelf.create(id: user.id, user: user)

b1 = Book.create!(id: Book.all.length, name: "Euthyphro", year: 399, thinker:t1, shelf:shelf)
b2 = Book.create!(id: Book.all.length, name: "Apology", year: 399, thinker:t1, shelf:shelf)
b3 = Book.create!(id: Book.all.length, name: "Categories", year: 322, thinker:t2, shelf:shelf)

Influence.create(teacher:t1, student:t2)
Influence.create(teacher:t5, student:t8)
