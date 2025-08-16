// In your backend authRoutes.js (Express route example):
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      // Assuming you are using bcrypt to compare the password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
  
      // Respond with the user data or a token
      res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  