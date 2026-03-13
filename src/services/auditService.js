//   async auditUser(targetUserId: string, adminUser: User): Promise<any> {
//     this.verifyAdmin(adminUser);
//     const response = await fetch(`/api/users/audit/${targetUserId}`);
//     if (!response.ok) throw new Error("Failed to audit user.");
//     return response.json();
//   },

export const fetchauditUser = async (targetUserId) => {
    try {
        const res = await fetch(`/api/users/audit/${targetUserId}`);
        console.log(res);
        return res.data;

    } catch (error) {

        // get backend message
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log("User Not Found:", message);

        throw new Error(message); // send real message to frontend
    }
};