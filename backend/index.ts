import express from "express";
import cors from "cors";
import { Client } from "pg";
import postgres from "postgres";
import e from "express";
import bcrypt from "bcryptjs";

const app = express();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: "ep-old-firefly-a5lv57qz.us-east-2.aws.neon.tech",
  database: "taskmgrsysdb",
  username: "taskmgrsysdb_owner",
  password: "bhKa7YAew5yl",
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${"ep-old-firefly-a5lv57qz"}`,
  },
});
// const sql = postgres({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: 'require',
//   connection: {
//     options: `project=${ENDPOINT_ID}`,
//   },
// }); 
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => { 
    res.json("Welcome to Task Manager System API");
});

app.post("/login", async (req, res) => {
    try { 
        const email = req.body.email;
        const password = req.body.password;
        const user = sql`SELECT * FROM users WHERE email = ${email}`;
        const results = await user;
        if (results.length === 0) {
        res.status(404).json({ isSuccess: false, message: "User not found" });
        } else {
        const match = bcrypt.compareSync(password, results[0].password);
        if (match) {
            res.json({
                message: "User registered successfully",
                data: results[0],
                isSuccess: true
            });
        } else {
            res.status(401).json({isSuccess:false, message: "Invalid credentials" });
        }
        }
    } catch (error: any) {
        res.status(500).json({ isSuccess: false, message: error.message });
    }
});

app.post("/register", async (req, res) => { 
    try {
        const newUser = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
        newUser.isadmin = newUser.isadmin ? '1' : '0';
        const users = sql`INSERT INTO users ${sql(newUser, 'firstname', 'lastname', 'email','password', 'isadmin')};`; 
        const results = await users; 
        const user_id = sql`SELECT id FROM users WHERE email = ${newUser.email}`;
        const user_id_res = await user_id;
        res.json({
            message: "User registered successfully",
            data: user_id_res[0],
            isSuccess: true
        });
    } catch (error: any) {
        res.status(500).json({ isSuccess: false, message: error.message });
    }
});

app.put("/reset-password/:id", async (req, res) => { 
  try {
      const user_id = req.params.id;
      const user_password = req.body.password;
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(user_password, salt);  
      const users = sql`update users set password = ${hash} where id = ${user_id}`;
      const results = await users;   
      res.json({
          message: "Password updated successfully.",
          data: results,
          isSuccess: true
      });
  } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
  }
});


app.get("/verify", async (req: any, res) => {
  try { 
    const email = req.query.email; 
    const users = sql`SELECT id FROM users where email = ${email}`;
    const results = await users;
    res.json({ 
        data: results,
        isSuccess: results.length > 0
    });
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
});

app.get("/all-events", async (req: any, res) => {
  try {
      const events = sql`SELECT * FROM events`;
      const results = await events;
      res.json(results);
  } catch (error:any) {
      res.status(500).json({ isSuccess: false, message: error.message });
  }
}); 
app.get("/events", async (req: any, res) => {
  try {
    const getSql = sql`SELECT isadmin FROM users WHERE id = ${req.query.user_id}`;
    const getRes = await getSql; 
    if (getRes.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      const events =
        getRes[0].isadmin !== "1"
          ? sql`SELECT * FROM events WHERE createdby = ${req.query.user_id}`
          : sql`SELECT * FROM events`;
      const results = await events;
      res.json(results);
    }
  } catch (error:any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
}); 

app.get("/events/:id", async (req: any, res) => {
  try { 
      const isAdmin = req.query.isadmin; 
      const event = isAdmin === "0" ?
       sql`SELECT * FROM events WHERE  createdby= ${req.query.user_id} and id = ${req.params.id}`:
       sql`SELECT * FROM events WHERE id = ${req.params.id}`;
      const results = await event;
      res.json(results);
  } catch (error:any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
}); 

app.post("/events", async (req, res) => {
    try {
      const newEvent = req.body; 
      newEvent.createdby = req.body.user_id; 
      const events = sql`INSERT INTO events ${sql(newEvent, 'name', 'attendants', 'description', 'createdby', 'datetime')}`; 
      const results = await events; 
      res.json({
        message: "Event created successfully",
        data: results,
        isSuccess: true
    });
    } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  });
  app.put("/events/:id", async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = req.body;  
      event.createdby = req.body.user_id; 
      const events = sql`update events set ${sql(event, 'name', 'attendants', 'description', 'createdby', 'datetime')} where id = ${eventId}`;
      const results = await events;
      res.json({
        message: "Event updated successfully",
        data: results,
        isSuccess: true
    });
    } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  });
  app.delete("/events/:id", async (req, res) => {
    try {
      const eventId = req.params.id;
      const events = sql`delete from events where id = ${eventId}`;
      const results = await events;
      res.json({
        message: "Event deleted successfully",
        data: results,
        isSuccess: true
    });
    } catch (error: any) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  });

app.get("/users", async (req, res) => { 
  try {
    const users = sql`SELECT id,firstname,lastname,email,isadmin  FROM users`;
    const results = await users;
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
});
app.get("/users/:id", async (req: any, res) => {
  try { 
      const user = sql`SELECT id,firstname,lastname,email,isadmin FROM users WHERE id = ${req.params.id}`;
      const results = await user;
      res.json(results);
  } catch (error:any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
}); 
app.post("/users", async (req, res) => {
  try {
    const newUser = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;
    newUser.isadmin = newUser.isadmin ? '1' : '0';
    const users = sql`INSERT INTO users ${sql(newUser, 'firstname', 'lastname', 'email','password', 'isadmin')}`; 
    const results = await users; 
    res.json({
        message: "User registered successfully",
        data: results,
        isSuccess: true
    });
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.body; 
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    user.isadmin = user.isadmin ? '1' : '0';    
    const users = sql`update users set ${sql(user, 'firstname', 'lastname', 'email','password', 'isadmin')} where id = ${userId}`;
    const results = await users;
    res.json({
        message: "User updated successfully",
        data: results,
        isSuccess: true
    });
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;    
    const users = sql`delete from users where id = ${userId}`;
    const results = await users;
    res.json({
        message: "User deleted successfully",
        data: results,
        isSuccess: true
    });
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
});


app.listen(8800, () => {
  console.log("Connected to port 8800");
});
