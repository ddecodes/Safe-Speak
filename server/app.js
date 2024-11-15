var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const User = require('./models/userModel');
const Blog = require('./models/blogModel');
const cors = require('cors');

app.use(cors());

// GET from database
app.get('/profile', async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET by ID from database
app.get('/profile/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid: uid });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET route to fetch the most recent posts
app.get('/blog/recent', async (req, res) => {
  try {
    // Fetch the most recent posts from your database
    const recentPosts = await Blog.find()
      .sort({ date: -1 }) // Sort by the 'date' field in descending order
      .limit(1); // Limit the number of posts returned

    // Return the most recent posts in the response
    res.json(recentPosts);
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ error: 'Failed to fetch recent posts' });
  }
});

// POST to database
app.post('/profile', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
})

// Update data in database
app.put('/profile/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const updatedUser = await User.findOneAndUpdate({ uid: uid }, req.body, { new: true });

    // If the profile doesn't exist
    if (!updatedUser) {
      return res.status(404).json({ message: `Cannot find profile with username ${uid}` });
    }

    // If the profile is successfully updated
    res.status(200).json(updatedUser);
  } catch (error) {
    // If an error occurs during the update process
    res.status(500).json({ message: error.message });
  }
});

// POST for blog
app.post('/blog', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
})

//GET blog posts
app.get('/blog', async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//DELTE a blog post
app.delete('/blog/:bid', async (req, res) => {
  try {
    const { bid } = req.params;
    const blog = await Blog.findOneAndDelete({ bid: bid });
    if (!blog) {
      return res.status(404).json({ message: `Cannot find blog with ID ${bid}` });
    }
    res.status(200).json(blog); // Return the deleted blog
  } catch (error) { // Define the error parameter
    res.status(500).json({ message: error.message });
  }
});


// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://vichekaoeun:bQLgz9LQ3z6fst43@cluster0.rnwirof.mongodb.net/?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
    .then(() => {
      console.log('Database Connected!');
      app.listen(3001, () => {
        console.log(`Running on port 3001`);
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
module.exports = app;