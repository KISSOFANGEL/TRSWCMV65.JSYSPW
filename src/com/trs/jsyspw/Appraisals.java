package com.trs.jsyspw;

/**
 * <p>Title:        TRS WCM</p>
 * <p>Copyright:    Copyright (c) 2004</p>
 * <p>Company:      www.trs.com.cn</p>
 * @author			wangjiang
 * @copyright		www.trs.com.cn
 * @created by		XWCMAutoTool 2.2
 * @version			5.2
 *
 * <p>Created:         2014/10/31 10:29:18</p>
 * <p>Last Modified:   2015/6/3 10:13:18</p>
 * <p>Description:
 *      class Appraisals —— Appraisal集合对象的定义和实现</p>
 * <p>Update Logs:
 *		[1] wangjiang@2014/10/31 10:29:18 创建对象
 *		[2] 
 */

import com.trs.cms.auth.persistent.User;
import com.trs.cms.content.CMSBaseObjs;
import com.trs.infra.common.WCMException;
import com.trs.infra.persistent.BaseObjs;
import com.trs.infra.persistent.WCMFilter;


public class Appraisals extends CMSBaseObjs{

    /**
     * 构造函数
     * 
     * @see public Appraisals( User _currUser, int
     *      _initCapacity, int _incCapacity );
     */
    public Appraisals(User _currUser) {
        super(_currUser);
    }

    /**
     * 构造函数
     * 
     * @param _currUser
     *            当前操作用户
     * @param _initCapacity
     *            初始化容量
     * @param _incCapacity
     *            当容量不足时，每次增容量
     */
    public Appraisals(User _currUser, int _initCapacity, int _incCapacity) {
        super(_currUser, _initCapacity, _incCapacity);
    }

    //=============================================================
    //重载父类中定义的抽象接口函数

    /**
     * 取对象数据存储的数据表名称
     * 
     * @return 对象数据存储的数据表名称
     */
    protected String getDbTableName() {
        return Appraisal.DB_TABLE_NAME;
    }

    /**
     * 取对象数据存储的ID字段名
     * 
     * @return ID字段名
     */
    public String getIdFieldName() {
        return Appraisal.DB_ID_NAME;
    }

    /**
     * 取集合元素类
     * 
     * @return 集合元素类
     */
    public Class getElementClass() {
        return Appraisal.class;
    }

    

    //==============================================================
    //集合操作

    //==============================================================
    // XML导入/导出

    //==============================================================================
    //逻辑操作
    /**
     * 提取指定ID序列的对象集合
     * 
     * @param _sIds
     *            指定的对象ID序列
     * @return 指定对象集合（Appraisals）
     * @throws WCMException
     *             若提取对象失败，会抛出异常。
     */
    public final static Appraisals findByIds(User _currUser, String _sIds) {
        Appraisals currAppraisals = createNewInstance(_currUser);
        //检测ID的有效性
        if (_sIds == null || _sIds.length() <= 0) {
            return currAppraisals;
        }

        currAppraisals.addElement(_sIds);

        //提取指定ID的对象
        return currAppraisals;
    }//END: findById()

    /**
     * 通过指定一个Filter获取当前集合[Appraisals]
     * 
     * @param _filter
     *            指定的Filter
     * @return 当前集合[Appraisals]
     * @throws WCMException
     */
    public final static Appraisals openWCMObjs(User _currUser,
            WCMFilter _filter) throws WCMException {
        Appraisals currAppraisals = createNewInstance(_currUser);
        currAppraisals.open(_filter);
        return currAppraisals;
    }

    /**
     * 产生当前集合对象[Appraisals]的实例
     * 
     * @param _currUser
     *            当前操作用户
     * @return
     * @throws WCMException
     */
    public static Appraisals createNewInstance(User _currUser) {
        return new Appraisals(_currUser);
    }

    /* (non-Javadoc)
     * @see com.trs.infra.persistent.BaseObjs#newInstance()
     */
    public BaseObjs newInstance() throws Exception {
        return new Appraisals(this.currUser);
    }
}