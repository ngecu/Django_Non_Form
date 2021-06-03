from django.db import models

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=200,blank=True,null=True)
    email = models.CharField(max_length=200,blank=True,null=True)
    message = models.TextField(blank=True,null=True)
    
    def __str__(self):
        return str(self.name)