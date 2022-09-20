from django.db import models

# Create your models here.

# Here we create the databases replica


class Note(models.Model):
    # blank = True means not blank form submission
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
