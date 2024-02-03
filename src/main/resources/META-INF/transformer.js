var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var FieldInsnNode = Java.type("org.objectweb.asm.tree.FieldInsnNode");

function initializeCoreMod() {
    return {
        "GameNarrator_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/client/GameNarrator",
                "methodName": "<init>",
                "methodDesc": "(Lnet/minecraft/client/Minecraft;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.INVOKESTATIC && node.owner.equals("com/mojang/text2speech/Narrator") && node.name.equals("getNarrator") && node.desc.equals("()Lcom/mojang/text2speech/Narrator;")) {
                        mn.instructions.set(node, new FieldInsnNode(Opcodes.GETSTATIC, "com/mojang/text2speech/Narrator", "EMPTY", "Lcom/mojang/text2speech/Narrator;"));
                    }
                }
                return mn;
            }
        }
    }
}
