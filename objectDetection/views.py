from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


def home(request):
    return render(request, 'home.html')


def objectDetection(request):
    return render(request, 'objectDetection.html')


def textDetection(request):

    return render(request, 'textDetection.html')


def voiceDetection(request):
    return render(request, 'voiceDetection.html')


@csrf_exempt
def uploadFile(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['file']
        print(uploaded_file.name)
        print(uploaded_file.size)
        # Do something with the uploaded file here, e.g. save it to a folder or database

        return HttpResponse(status=200)
