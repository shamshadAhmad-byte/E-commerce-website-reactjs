import os
from test import TestOptions
from util import util
from models import create_model
from data.data_loader import CreateDataLoader
from PIL import Image
import torch

def generate_tryon(person_path, cloth_path, output_dir="./outputs/api_result"):
    os.makedirs(output_dir, exist_ok=True)

    opt = TestOptions().parse()
    opt.name = 'viton_hd'
    opt.stage = 'TOM'
    opt.checkpoints_dir = './checkpoints'
    opt.results_dir = output_dir
    opt.data_list = './test_pairs.txt'
    opt.datamode = 'test'
    opt.datasetting = 'unpaired'
    opt.batch_size = 1
    opt.display_winsize = 512
    opt.gpu_ids = [0] if torch.cuda.is_available() else []

    # Create data loader & model
    dataset = CreateDataLoader(opt).load_data()
    model = create_model(opt)
    model.eval()

    # You can modify dataset to take your single person/cloth input
    # (for simplicity, assume we already placed images in the dataset folder structure)

    # Run model
    with torch.no_grad():
        for i, data in enumerate(dataset):
            model.set_input(data)
            model.test()
            visuals = model.get_current_visuals()
            img_path = model.get_image_paths()
            for label, im_data in visuals.items():
                image_numpy = util.tensor2im(im_data)
                save_path = os.path.join(output_dir, f"{label}.jpg")
                util.save_image(image_numpy, save_path)
                if label == 'try-on':
                    result_image = Image.open(save_path).convert("RGB")
                    return result_image

    raise Exception("Try-on image not generated")
