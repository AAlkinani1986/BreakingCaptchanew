from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import os
import datetime
import pytz
from django.core.files.storage import FileSystemStorage
import cv2
from objectDetection import apiTextDetection


def home(request):
    return render(request, "home.html")


def objectDetection(request):
    return render(request, "objectDetection.html")


def textDetection(request):
    return render(request, "textDetection.html")


def voiceDetection(request):
    return render(request, "voiceDetection.html")


# Define new_filename as public variable
new_filename = ""


@csrf_exempt
def uploadFile(request):
    global new_filename  # Declare new_filename as a global variable
    if request.method == "POST":
        uploaded_file = request.FILES["file"]
        print(uploaded_file.name)
        print(uploaded_file.size)
        username = request.user.username
        # replace with your timezone
        local_tz = pytz.timezone("Australia/Sydney")
        date = datetime.datetime.now(local_tz).strftime("%Y-%m-%d_%H-%M-%S")
        filename, file_extension = os.path.splitext(uploaded_file.name)
        new_filename = f"{username}_{date}{file_extension}"
        print(new_filename)
        # Do something with the uploaded file here, e.g. save it to a folder or database
        fs = FileSystemStorage()
        fs.save(new_filename, uploaded_file)
        # Load the image using OpenCV

        return HttpResponse(status=200)


def APITextDetection(request):
    if request.method == "GET":
        # Load the image using OpenCV
        imagePath = f"../BreakingCaptchanew/media/{new_filename}"
        print(imagePath)
        image = cv2.imread(imagePath)

        # Pass the image to the detect_document function
        data = apiTextDetection.detect_document(image)

        # Return the result as a JSON response
        return JsonResponse(data, status=200, safe=False)
