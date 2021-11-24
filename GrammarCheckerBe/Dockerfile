FROM grammarcheckerfunction:python3.7-v1
ADD app.py ./
ADD model ./model
# FROM public.ecr.aws/lambda/python:3.7

# COPY requirements.txt ./
# ADD model ./model
# RUN yum install -y gcc-c++
# RUN pip3 install --upgrade pip
# RUN pip3 install -r requirements.txt -t .

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambda_handler"]