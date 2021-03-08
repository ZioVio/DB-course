def get_input(lines, header='', footer='', input_text=''):
    print()
    lines_with_numbers = [f"{index + 1}. {lines[index]}" for index in range(len(lines))]
    if header != '':
        print(header)
    print('\n'.join(lines_with_numbers))
    if footer != '':
        print(footer)
    print()
    return int(input(input_text))

