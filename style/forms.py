from django import forms
from django.core.validators import FileExtensionValidator

import filetype


class ImageForm(forms.Form):
    image = forms.ImageField()

    def clean_image(self):
        data = self.cleaned_data['image']
        kind = filetype.guess(data.read())
        data.seek(0)

        if kind is None:
            return False
        return kind.mime == 'image/png'
