# Shared Real-time Grocery List
Grocery list web-application that can be shared in real-time by multiple people.
Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. When you arrive at the grocery store, you split up to shop individually. This allows the groceries to be acquired in the fastest possible way. Each person has the same grocery list on their phone. When one of you checks a grocery item off the shared list, it updates on everyone else’s list, preventing anyone from purchasing duplicate items. Similarly, items added to the list on any phone update to the same list.


# The backend
I opted to create a RESTful API backend using following technologies:
- ORM: Sequelize
- Authentication: Passport-Local and Passport-JWT
- Testing: Jasmine

# The frontend
- React without store management (like Redux)
- Authentication via JWT
- Axios