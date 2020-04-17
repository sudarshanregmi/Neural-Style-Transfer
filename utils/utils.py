import torch
from PIL import Image
from utils import utils
import base64, io


def image_as_base64(image_file, format='png'):
    img = Image.open("./style/static/style-sample-images/temp.jpg") #temporary workaround, will get back to it
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    return 'data:image/%s;base64,%s' % (format, img_str.decode('ascii'))


def save_image(filename, data):
    img = data.clone().clamp(0, 255).numpy()
    img = img.transpose(1, 2, 0).astype("uint8")
    img = Image.fromarray(img)
    img.save(filename)
