import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    console.log('Test route working');
    res.send('MERN Stack Backend Running');
  });
  

  export default router;