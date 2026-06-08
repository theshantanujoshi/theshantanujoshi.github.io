import urllib.request
import os
import concurrent.futures

links = [
    "https://drive.google.com/file/d/1GKPdZXjjzd0mIXbzQjjujoUVunJADZ0u/view?usp=drive_link",
    "https://drive.google.com/file/d/1_w46zlERk_QTn7UNM-UvbhMDEXrgUs7o/view?usp=drive_link",
    "https://drive.google.com/file/d/1NB7hWHAVyHxWmMQFKsNuHP4Hd4t_jpGp/view?usp=drive_link",
    "https://drive.google.com/file/d/13PQHbKfxUq83eN21nUx4K5mcUxqbeS-S/view?usp=drive_link",
    "https://drive.google.com/file/d/1L533Pq32d71W5j2NnoGeBh9WpY88umn5/view?usp=drive_link",
    "https://drive.google.com/file/d/1gmJ0ZT894s2YTFAkewoimgpaVABmrA8g/view?usp=drive_link",
    "https://drive.google.com/file/d/1ZnTs2lD0DG8fuHWsc4oFQjoEu-x3Q8oF/view?usp=drive_link",
    "https://drive.google.com/file/d/1dcGicerJ02wj9dkvPVR7Lv_CZjcB-jLT/view?usp=drive_link",
    "https://drive.google.com/file/d/1sp833ybiNwf7onmg9rfZHw0xiKerdOHg/view?usp=drive_link",
    "https://drive.google.com/file/d/101y4f7TkQ6SZLHeKNx68w9d99wkz1mGI/view?usp=drive_link",
    "https://drive.google.com/file/d/1ITcOWi5lZ1Np2RIdpkX5CZ8dINpdz-an/view?usp=drive_link",
    "https://drive.google.com/file/d/1Dnas_IYqODAyqexXxoClSJYapMDvcPP2/view?usp=drive_link",
    "https://drive.google.com/file/d/1vfeBHLaD86LPWeq4uRFTpNi9woa8LlUL/view?usp=drive_link",
    "https://drive.google.com/file/d/183rDtIT89-lHDktgcox0evSP_0LzOOnn/view?usp=drive_link",
    "https://drive.google.com/file/d/1D45vo3bZ2iDQ9qtx-lZkqyoKKrzMPO6Y/view?usp=drive_link",
    "https://drive.google.com/file/d/1VfNjoawFcdwN7v3yiFmkEdCvY-IXz6VE/view?usp=drive_link",
    "https://drive.google.com/file/d/18_zNJoAHIledKtVYxzWDeA1TVMrpxQor/view?usp=drive_link",
    "https://drive.google.com/file/d/1qgSNE5W7b8rozB-mwOy2N1kQRoEBa4TL/view?usp=drive_link",
    "https://drive.google.com/file/d/1LJA8PPEhmd3ReN6gJZrMeHRIdBGjxpeV/view?usp=drive_link",
    "https://drive.google.com/file/d/1aWHinh0VQRm9jzWIB1zmaJHMu_aX10Lw/view?usp=drive_link",
    "https://drive.google.com/file/d/1StpBr5FKiRUmIrEK5mB1fj2bxufI49q2/view?usp=drive_link",
    "https://drive.google.com/file/d/1gqK4L9CqhaIqwW-Cw6izUO1YXtpbFpiH/view?usp=drive_link",
    "https://drive.google.com/file/d/1KBS9ypB95rrO0cnqE8ONtQPB_y2StIUQ/view?usp=drive_link",
    "https://drive.google.com/file/d/1S0uW9cSlJYDSH_SXVtNdbT0sz_fC3dnS/view?usp=drive_link",
    "https://drive.google.com/file/d/17jj9ejE5gygLMrcfGqXkAcFvHw5cD19w/view?usp=drive_link",
    "https://drive.google.com/file/d/1JY7t72snPCoerlB03tddyhyFbteFFp6C/view?usp=drive_link",
    "https://drive.google.com/file/d/1mXkjUdFw0Wbaq2zAUoAXs5kpzcIq7hJh/view?usp=drive_link",
    "https://drive.google.com/file/d/1uhFCm0LwL0DtPGFr2o1a2Q_MUeyjHsgy/view?usp=drive_link",
    "https://drive.google.com/file/d/1kh-lF83gRlNMYQEY1ts99_XzHLPqAeZc/view?usp=drive_link",
    "https://drive.google.com/file/d/1oJzGXmca_8P-lJTzdMC07sDFY-UvDcEC/view?usp=drive_link",
    "https://drive.google.com/file/d/1aRFKDF51qj6g2u5hORk1K4WkQB6bwyq6/view?usp=drive_link",
    "https://drive.google.com/file/d/1crqLOa8gTrfEYj929zG1yU2Z3NAsDz8B/view?usp=drive_link",
    "https://drive.google.com/file/d/1Q8-j2It2D0NZ-Kz6_vb1cK8u0vVf-us5/view?usp=drive_link",
    "https://drive.google.com/file/d/1-2oN6Tn_8bntLaP8HUQvBBtnCwGrx5cX/view?usp=drive_link",
    "https://drive.google.com/file/d/1j_4u4dhgrZfq-v2NkhnIUajG10KUWNhK/view?usp=drive_link",
    "https://drive.google.com/file/d/1Q5U6VmmK_XOb46xNF2YOag_b70haqDii/view?usp=drive_link",
    "https://drive.google.com/file/d/1iacfIJgeyekgMzbTZDxIaeCiFRqTeU36/view?usp=drive_link",
    "https://drive.google.com/file/d/1G8d9z0o_OsYTsb0xI0MOOSpTzseeNbpk/view?usp=drive_link",
    "https://drive.google.com/file/d/1FjfP7DG8RiEanCB6UMRlSig4BnxMPru7/view?usp=drive_link",
    "https://drive.google.com/file/d/1kOSXs-_xaJOcP9Y2U1R7RpleuX8WY8sX/view?usp=drive_link",
    "https://drive.google.com/file/d/1fDTY2-5JK7GTfALvp3XWft18mSuygIkq/view?usp=drive_link",
    "https://drive.google.com/file/d/1bEHpbzMDnsoyjzGYMdL5DI1S778uIRj8/view?usp=drive_link",
    "https://drive.google.com/file/d/1qysaQ_k7FPfpMkfIA199_DCmI4_QeTrN/view?usp=drive_link",
    "https://drive.google.com/file/d/1uXtzsmDbyn5Cm0NMznxddqVxSqhA2RfY/view?usp=drive_link",
    "https://drive.google.com/file/d/11vcRV4gYji_8OVWKXIyHgfn0bwfaXNLG/view?usp=drive_link",
    "https://drive.google.com/file/d/1sXXElIuVj8XCM708CAMyQnLNbM6rj9Ko/view?usp=drive_link",
    "https://drive.google.com/file/d/1EDb7VJ_HfsBhAL3I7H_VLWU7mVXD2oum/view?usp=drive_link",
    "https://drive.google.com/file/d/1aRTS_sL114N3isxrW_VLLL4eazUYo7cX/view?usp=drive_link",
    "https://drive.google.com/file/d/1dvJpo6A20QAM_mJUOpqyJueTSqY_p7_g/view?usp=drive_link",
    "https://drive.google.com/file/d/14Km7RobAq4GJW5juZApYzdStJpzsieNg/view?usp=drive_link"
]

out_dir = r"c:\Users\Shantanu Joshi\Desktop\popolio\src\assets\journal"
os.makedirs(out_dir, exist_ok=True)

def download_file(args):
    index, link = args
    fid = link.split('/d/')[1].split('/')[0]
    name = f"journal_{index}.jpg"
    url = f"https://drive.google.com/uc?export=download&id={fid}"
    out_path = os.path.join(out_dir, name)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(out_path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Downloaded {name} ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")

with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    executor.map(download_file, [(i+1, link) for i, link in enumerate(links)])
