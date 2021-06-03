from django.http.response import JsonResponse
from django.shortcuts import render
from .models import *
from django.http import HttpResponse
from django.core import serializers
import json
# Create your views here.

def index(request):
    return render(request, 'main/index.html')


def postMessage(request):
    data = json.loads(request.body)
    print(data)
    name = data['form']['name']
    email = data['form']['email']
    message = data['form']['message']
    contactItem,created = Contact.objects.get_or_create(name=name,email=email,message=message)
    contactItem.save()
    return HttpResponse("Success submition!")

    # else :
    #     return HttpResponse("Request method is not a GET")

def Messages(request):
    messages = Contact.objects.all()
    message_list = serializers.serialize('json',messages)
    return JsonResponse(message_list,safe=False)
