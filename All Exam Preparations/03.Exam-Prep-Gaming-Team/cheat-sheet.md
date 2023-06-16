# Cheat Sheet

1. Initialize project and structure
2. Setup dev environment
3. Install and setup express
    * add static middleware
    * add body parser
    * add routes
4. Add static resources
5. Add views folder with ready htmls
6. Add express-handlebars view engine
    * install express
    * add to express
    * config extension
    * config views folder (only for src)
    * add main layout
    * add partials folder
    * fix static paths
    * fix navigation to home
    * render home page
7. Add controllers folder with home controller
8. Add database
    * install mongoose
    * connect database
9. Authentication
    * add user controller
    * add controller to routes
    * fix header navigation to login, register and logout
    * render login page
    * render register page
10. Add user model
    * add unique index for username
    * validate repeat password
11. Modify login and register forms
12. Add login and register post actions
13. Add user manager
    * require in user controller
    * add register method
    * validate if user already exists
14. Hash password
    * install bcrypt
    * hash password
15. Login 
    * Find user by username
    * Validate password with hash
16. Generate jwt token
    * install jsonwebtoken
    * promisify jsonwebtoken (optional)
    * create secret
    * generate token in manager.login
17. Return token in cookie
    * install cookie parser
    * config cookie parser
    * set cookie with token
18. Logout
19. Authentication middleware
    * create base middleware
    * use middleware
    * implement auth middleware
    * attach decoded token to request
    * handle invalid token
20. Authorization middleware
21. Dynamic navigation
    * add conditional in main layout
    * add to res locals
22. Error handling
    * add 404 page
    * redirect missing route to 404
    * add global error handler (optional)
    * use global error handler after routes (optional)
    * add error message extractor
23. Show error notifications
    * add error container to main layout
    * show error container conditionaly
    * pass error to render
    * add local error handler
24. Automatically login after register

## Next time
1. Global error handler
2. Debugger