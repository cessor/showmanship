import re
import string
import sys

import mistune

tag_pattern = re.compile(r'([\w]+): ', re.IGNORECASE)
tag = string.Template('''<$tag>$content</$tag>''')

section = string.Template('''
    <section class="slide">
        $content
    </section>
''')


def clean_line(line):
    line = remove_superfluous_tags(line)
    line = replace_custom_tags(line)
    line = line.strip()
    return line


def remove_superfluous_tags(line):
    return line.replace('<p>', '').replace('</p>', '')


def replace_custom_tags(line):
    if tag_pattern.match(line):
        tagname, content = line.split(':')
        content = content.strip()
        line = tag.substitute(
            tag=tagname,
            content=content
        )
    return line


def slide(fragment):
    lines = fragment.split('\n')
    lines = [clean_line(line) for line in lines]
    content = '\n\t'.join(lines).strip()
    return section.substitute(content=content)


def slides(markdown):
    fragments = [
        mistune.markdown(fragment)
        for fragment
        in markdown.split('\n\n')
    ]

    slide_elements = [
        slide(fragment)
        for fragment
        in fragments
    ]

    html = ''.join(slide_elements)
    return html


if __name__ == '__main__':
    markdown = sys.stdin.read()
    html = slides(markdown)
    print(html)
