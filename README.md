## Installation

1. Navigate to the project directory:
    ```bash
    cd <Question1/Question2>
    ```

2. Start the application:
    ```bash
    npm start
    ```

## Endpoints for Question2 (Mining)

### User Endpoints

- **Add User**  
  `POST` - `localhost:8000/user/add`  
  Description: Endpoint to add a new user.

- **Get User Balance**  
  `GET` - `localhost:8000/user/balance`  
  Description: Endpoint to retrieve the balance of a user.

### Mining Endpoints

- **Start Mining**  
  `POST` - `localhost:8000/mining/start`  
  Description: Endpoint to start the mining process.

- **Claim Mining Rewards**  
  `POST` - `localhost:8000/mining/claim`  
  Description: Endpoint to claim the rewards after mining.
