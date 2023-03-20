<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
export default {
  name: 'ConfigCheckboxComponent'
}
</script>
<script setup>
defineEmits(['changePanel'])
const {
  checkTypeBySelected,
  target
} = hooks.useTarget()
const options0 = [
  {
    label: '左对齐',
    value: 'start'
  },
  {
    label: '右对齐',
    value: 'end'
  },
  {
    label: '居中',
    value: 'center'
  },
  {
    label: '两侧间隔相等',
    value: 'space-around'
  },
  {
    label: '两侧间隔相等',
    value: 'space-between'
  }
]
// const options1 = [
//   {
//     label: '顶对齐',
//     value: 'top'
//   },
//   {
//     label: '居中',
//     value: 'middle'
//   },
//   {
//     label: '底对齐',
//     value: 'bottom'
//   }
// ]
</script>
<template>
  <div>
    <template v-if="checkTypeBySelected(['grid'])">
      <el-form-item label="水平排列方式">
        <el-select style="width: 100%;" v-model="target.options.justify" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in options0"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="垂直排列方式">-->
<!--        <el-select style="width: 100%;" v-model="target.options.align" class="m-2" placeholder="Select" size="large">-->
<!--          <el-option-->
<!--            v-for="item in options1"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
    </template>
<!--    <template v-if="checkTypeBySelected(['col'])">-->
<!--      <el-row :gutter="8">-->
<!--        <el-col :span="12">-->
<!--          <el-form-item label="栅格占据的列数">-->
<!--            <el-input-number-->
<!--              :min="0"-->
<!--              controls-position="right"-->
<!--              v-model="target.options.span" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item label="栅格左侧的间隔格数">-->
<!--            <el-input-number-->
<!--              :min="0"-->
<!--              controls-position="right" v-model="target.options.offset" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--&lt;!&ndash;      <el-row :gutter="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-col :span="12">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="栅格向左移动格数">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input-number&ndash;&gt;-->
<!--&lt;!&ndash;              :min="0"&ndash;&gt;-->
<!--&lt;!&ndash;              controls-position="right" v-model="target.options.pull" />&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-col :span="12">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="栅格向右移动格数">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input-number&ndash;&gt;-->
<!--&lt;!&ndash;              :min="0"&ndash;&gt;-->
<!--&lt;!&ndash;              controls-position="right" v-model="target.options.push" />&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-row>&ndash;&gt;-->
<!--    </template>-->
  </div>
</template>
