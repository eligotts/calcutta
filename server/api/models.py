from django.db import models

# Create your models here.

class Player(models.Model):
    name = models.TextField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    # card_img = models.ImageField(null=True, blank=True, upload_to='images/')
    img_link = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name