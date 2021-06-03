from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path('postMessage/',views.postMessage,name='postMessage'),
    path('messages/',views.Messages,name='messages')

]