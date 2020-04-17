from django.http.response import JsonResponse
from django.views.generic.edit import FormView
from style.forms import ImageForm
from utils.utils import image_as_base64
from utils.style import stylize
from PIL import Image
import io

class IndexView(FormView):
    template_name = "style/home.html"
    form_class = ImageForm

    def form_valid(self, form):
        objects = form["image"].data.read()
        style = form.cleaned_data.get('style')
        image = Image.open(io.BytesIO(objects))
        img = stylize(image, style)
        return JsonResponse({"image": image_as_base64(img)})
