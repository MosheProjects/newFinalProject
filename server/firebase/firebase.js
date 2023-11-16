const serviceAccount = require("./final-project-ort-firebase-adminsdk-deizh-ee0aac458b.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "final-project-ort",
});

// Example of listing all users using Firebase Admin SDK
const getUsers = async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((userRecord) =>
      userRecord.toJSON()
    );
    res.json(users);
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).json({ error: "Failed to retrieve user list" });
  }
};

const RemoveUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    await admin
      .auth()
      .deleteUser(uid)
      .then(() => {
        getUsers;
      });
  } catch (error) {
    console.error("Error removing users:", error);
    res.status(500).json({ error: "Failed to remove user" });
  }
};

module.exports = { getUsers, RemoveUser };
