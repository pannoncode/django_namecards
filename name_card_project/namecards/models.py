from django.db import models

# Create your models here.


class UserCardModel(models.Model):
    IMAGE_CHOICES = [
        ('media/aliens.jpeg', 'Alien'),
        ('media/batman.jpeg', 'Batman'),
        ('media/joker.jpeg', 'Joker'),
        ('media/madmax.jpeg', 'Mad Max'),
        ('media/predator.jpeg', 'Predator'),
        ('media/demogorgon.jpeg', 'Demogorgon'),
        ('media/golam.jpeg', 'Golam'),
        ('media/robocop.jpeg', 'Robotzsaru'),
        ('media/terminator.jpeg', 'Terminator'),
    ]
    image_option = models.CharField(
        choices=IMAGE_CHOICES, max_length=100, default='media/aliens.jpeg')
    name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self) -> str:
        return self.name