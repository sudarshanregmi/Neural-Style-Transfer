import torch
from torchvision import transforms
from PIL import Image
from io import StringIO
import re, io
from utils import utils
from utils.transformerNet import TransformerNet

def stylize(content_image, style):
    device = torch.device("cpu")
    content_transform = transforms.Compose([
        transforms.ToTensor()
        # transforms.Lambda(lambda x: x.mul(255))
    ])
    content_image = content_transform(content_image)
    content_image = content_image.unsqueeze(0).to(device)

    with torch.no_grad():
        style_model = TransformerNet()
        state_dict = torch.load("./saved_models/" + style)
        # remove saved deprecated running_* keys in InstanceNorm from the checkpoint
        for k in list(state_dict.keys()):
            if re.search(r'in\d+\.running_(mean|var)$', k):
                del state_dict[k]
        style_model.load_state_dict(state_dict)
        style_model.to(device)
        output = style_model(content_image).cpu()
        utils.save_image("temp.jpg", output[0])
        return output[0]
