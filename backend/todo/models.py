from django.db import models

# Create your models here.

class Todo (models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True, blank=True)
    notifications_enabled = models.BooleanField(default=False)

    def __str__(self):
        return self.title