/**
 * MInput类:实现一个宽度高度可自适应的input
 * @class
 * @param {object}  container
 * @param {object}  config
 * @param {string}  config.value
 * @param {string}  config.placeholder
 * @param {number}  config.defaultWidth
 * @param {number}  config.defaultHeight
 * @param {number}  config.offsetLeft // 自适应后，input完全填充后据父元素的左右边距
 * @param {number}  config.offsetTop // 自适应后，input完全填充后据父元素的上下边距
 * @param {boolean} config.disableAutoWidth // 是否关闭宽度自适应，默认为false
 * @param {boolean} config.disableAutoHeight // 是否关闭宽度自适应，默认为false
 * @author lmy
 */

function MInput(container, config) {

     // 此处暂未考虑传入高宽字符串处理；container为id处理
     if(typeof config !== 'object') {
        config = {}
     }
    this.config = Object.assign(this.getDefaultConfig(), config);

    if(container != null) {
        this.container = container;
        this.init();
    }
}

/**
 * 获取默认配置
 */
MInput.prototype.getDefaultConfig = function() {
    return {
        value: '',
        placeholder: '请输入',
        defaultWidth: 220,
        defaultHeight: 30,
        disableAutoWidth: false,
        disableAutoHeight: false,
        offsetLeft: 12,
        offsetTop: 12
    }
}

/**
 * input初始化
 */
MInput.prototype.init = function() {
    const coat = document.createElement('div');
    coat.style.border = '1px solid blue';
    coat.className = 'm-input-coat'
    coat.style.display = 'inline-block';

    // 去除滚动条
    document.styleSheets[0].insertRule('::-webkit-scrollbar{display: none}',0)

    // input
    const input = document.createElement('div');
    input.contentEditable = true;
    input.className = 'm-input'
    input.type = 'text';
    input.style.minWidth = this.config.defaultWidth + 'px';
    input.style.width = this.config.defaultWidth + 'px';
    input.style.height = this.config.defaultHeight + 'px';
    input.style.lineHeight = this.config.defaultHeight + 'px';
    input.style.overflowX = 'scroll'
    input.style.whiteSpace = 'nowrap';
    document.styleSheets[0].insertRule(`[contenteditable=true]:empty::before{content: '请输入' || ${this.config.placeholder}}`,0)

    // 存取之后需要的值
    this.input = input
    

    coat.appendChild(input);

    // 暂不考虑传id
    this.container.appendChild(coat);

    // 开启宽度自适应
    if(!this.config.disableAutoWidth) {
        this.enableAutoWidth()
    }

    // 开启高度自适应
    if(!this.config.disableAutoHeight) {
        this.enableAutoHeight()
    }

}


/**
 * 宽度可自适应
 */
MInput.prototype.enableAutoWidth = function () {  
    this.input.style.width = 'auto';
    const maxWidth = this.container.clientWidth - this.config.offsetLeft * 2;
    this.input.style.maxWidth = `${maxWidth}px`;
}

/**
 * 高度可自适应
 */
 MInput.prototype.enableAutoHeight = function () {  
    this.input.style.height = 'auto';
    const maxHeight = this.container.clientHeight - this.config.offsetTop * 2;
    this.input.style.maxHeight = `${maxHeight}px`;
    this.input.style.whiteSpace = 'normal';
}
