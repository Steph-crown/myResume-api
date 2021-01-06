# myResume REST API

**The REST API for the myResume app**

## ROUTES.
* ### **/user**
  * ### /user/signup (Post route to sign up)
    
    **Request Body**

    {
        "name": String,
        "email": String,
        "password": String
    }

  * ### /user/login (Post route to log in)
    
    **Request Body**

    {
        "email": String,
        "password": String
    }

  * ### /user/update-dashboard (Post route to update dashboard)
    
    **Request Body**

    {
        "email": String,
        "password": String,
        "dashboard": Object
    }

  * ### /user/recover-password (Post route to recover password)
    
    **Request Body**

    {
        "email": String,
    }

  * ### /user/delete-user (Post route to delete account)
    
    **Request Body**

    {
        "email": String,
        "password": String
    }

  * ### /user/change-password (Post route to change password)
    
    **Request Body**

    {
        "email": String,
        "password": String,
        "newPassword": String
    }
    

  