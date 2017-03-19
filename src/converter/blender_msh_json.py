import os
import bpy
import addon_utils

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

def main(filePath, fileName):
    clear_scene()

    fullPath = os.path.join(filePath, fileName)
    bpy.ops.import_mesh.allenbrain(filepath=fullPath)
    obj = bpy.data.objects[0]

    # find dimensions and scale accordingly
    dims = obj.dimensions
    scale = 1 #min(10 / dims[0], 10 / dims[1], 10 / dims[2])

    # set cursor to world origin, and set object-origin the same
    bpy.context.scene.cursor_location = (0, 0, 0)
    bpy.context.scene.objects.active = obj
    bpy.ops.object.origin_set(type='GEOMETRY_ORIGIN')
    obj.scale = (scale, scale, scale)

    json_fileName =  fileName[:-3] + 'json'
    finalPath = os.path.join(filePath, json_fileName)
    bpy.ops.export.three(filepath=finalPath,option_custom_properties=True,option_materials=True,option_export_scene=True)

def ensure_addon():
    try:
        addon_utils.enable("io_three")
        return True
    except:
        print('failed to enable io_three')
        return False

def path_iterator(path_name, ftype):
    for fp in os.listdir(path_name):
        if fp.endswith(ftype):
            yield fp

if ensure_addon():
    filePath = "C:\\Users\\stefa\\Documents\\workspace\\INF319\\mbdev\\dist\\models\\Spaces\\E11.5\\Meshes"

    for fileName in path_iterator(filePath, '.msh'):
        print(fileName)
        main(filePath, fileName)