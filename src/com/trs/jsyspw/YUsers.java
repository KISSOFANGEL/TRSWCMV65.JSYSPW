package com.trs.jsyspw;

/**
 * <p>Title:        TRS WCM</p>
 * <p>Copyright:    Copyright (c) 2004</p>
 * <p>Company:      www.trs.com.cn</p>
 * @author			trs wcm
 * @copyright		www.trs.com.cn
 * @created by		XWCMAutoTool 2.2
 * @version			5.2
 *
 * <p>Created:         2015/5/27 17:36:05</p>
 * <p>Last Modified:   2015/5/27 17:51:46</p>
 * <p>Description:
 *      class YUsers ���� YUser���϶���Ķ����ʵ��</p>
 * <p>Update Logs:
 *		[1] trs wcm@2015/5/27 17:36:05 ��������
 *		[2] 
 */

import com.trs.cms.auth.persistent.User;
import com.trs.cms.content.CMSBaseObjs;
import com.trs.infra.common.WCMException;
import com.trs.infra.persistent.BaseObjs;
import com.trs.infra.persistent.WCMFilter;


public class YUsers extends CMSBaseObjs{

    /**
     * ���캯��
     * 
     * @see public YUsers( User _currUser, int
     *      _initCapacity, int _incCapacity );
     */
    public YUsers(User _currUser) {
        super(_currUser);
    }

    /**
     * ���캯��
     * 
     * @param _currUser
     *            ��ǰ�����û�
     * @param _initCapacity
     *            ��ʼ������
     * @param _incCapacity
     *            ����������ʱ��ÿ��������
     */
    public YUsers(User _currUser, int _initCapacity, int _incCapacity) {
        super(_currUser, _initCapacity, _incCapacity);
    }

    //=============================================================
    //���ظ����ж���ĳ���ӿں���

    /**
     * ȡ�������ݴ洢�����ݱ�����
     * 
     * @return �������ݴ洢�����ݱ�����
     */
    protected String getDbTableName() {
        return YUser.DB_TABLE_NAME;
    }

    /**
     * ȡ�������ݴ洢��ID�ֶ���
     * 
     * @return ID�ֶ���
     */
    public String getIdFieldName() {
        return YUser.DB_ID_NAME;
    }

    /**
     * ȡ����Ԫ����
     * 
     * @return ����Ԫ����
     */
    public Class getElementClass() {
        return YUser.class;
    }

    

    //==============================================================
    //���ϲ���

    //==============================================================
    // XML����/����

    //==============================================================================
    //�߼�����
    /**
     * ��ȡָ��ID���еĶ��󼯺�
     * 
     * @param _sIds
     *            ָ���Ķ���ID����
     * @return ָ�����󼯺ϣ�YUsers��
     * @throws WCMException
     *             ����ȡ����ʧ�ܣ����׳��쳣��
     */
    public final static YUsers findByIds(User _currUser, String _sIds) {
        YUsers currYUsers = createNewInstance(_currUser);
        //���ID����Ч��
        if (_sIds == null || _sIds.length() <= 0) {
            return currYUsers;
        }

        currYUsers.addElement(_sIds);

        //��ȡָ��ID�Ķ���
        return currYUsers;
    }//END: findById()

    /**
     * ͨ��ָ��һ��Filter��ȡ��ǰ����[YUsers]
     * 
     * @param _filter
     *            ָ����Filter
     * @return ��ǰ����[YUsers]
     * @throws WCMException
     */
    public final static YUsers openWCMObjs(User _currUser,
            WCMFilter _filter) throws WCMException {
        YUsers currYUsers = createNewInstance(_currUser);
        currYUsers.open(_filter);
        return currYUsers;
    }

    /**
     * ������ǰ���϶���[YUsers]��ʵ��
     * 
     * @param _currUser
     *            ��ǰ�����û�
     * @return
     * @throws WCMException
     */
    public static YUsers createNewInstance(User _currUser) {
        return new YUsers(_currUser);
    }

    /* (non-Javadoc)
     * @see com.trs.infra.persistent.BaseObjs#newInstance()
     */
    public BaseObjs newInstance() throws Exception {
        return new YUsers(this.currUser);
    }
}