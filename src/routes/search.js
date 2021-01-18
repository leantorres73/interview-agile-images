import { Router } from 'express';
import models from '../models';

const router = Router();

router.get('/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  // As we don't have to use a query in database, here is a search
  var filtered = models.images.filter((item) => {
    return item.cropped_picture = searchTerm || item.author == searchTerm || item.camera == searchTerm || item.tags == searchTerm || item.full_picture == searchTerm;
  });
  return res.send(filtered);
});

export default router;
