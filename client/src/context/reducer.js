export default function reducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            localStorage.setItem(
                "token",
                JSON.stringify("Bearer " + action.payload)
            );
            return {
                token: "Bearer " + action.payload,
                user: true,
            };
        }
        case "LOGOUT_SUCCESS": {
            localStorage.removeItem("token");
            return {
                token: undefined,
                user: false,
            };
        }
        default:
            throw new Error("Invalid action");
    }
}
