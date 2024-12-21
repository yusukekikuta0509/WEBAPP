from jinja2 import Template

def generate_html(data):
    with open("templates/basic.html") as file:
        template = Template(file.read())
    return template.render(title=data['title'], content=data['content'])