import express from 'express';

const router = express.Router();

// Main routes
router.get('/about', (req, res) => {
  res.json({
    name: 'Juan',
    position: 'JAVASCRIPT DEV',
  })
});

router.get('/images', (req, res) => {
  // Handle image listing logic
});

router.get('/', (req, res) => {
  console.log('main page');
});

export default router;
