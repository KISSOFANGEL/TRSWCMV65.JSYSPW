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
 *      class Appraisals ���� Appraisal���϶���Ķ����ʵ��</p>
 * <p>Update Logs:
 *		[1] wangjiang@2014/10/31 10:29:18 ��������
 *		[2] 
 */

import com.trs.cms.auth.persistent.User;
import com.trs.cms.content.CMSBaseObjs;
import com.trs.infra.common.WCMException;
import com.trs.infra.persistent.BaseObjs;
import com.trs.infra.persistent.WCMFilter;


public class Appraisals extends CMSBaseObjs{

    /**
     * ���캯��
     * 
     * @see public Appraisals( User _currUser, int
     *      _initCapacity, int _incCapacity );
     */
    public Appraisals(User _currUser) {
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
    public Appraisals(User _currUser, int _initCapacity, int _incCapacity) {
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
        return Appraisal.DB_TABLE_NAME;
    }

    /**
     * ȡ�������ݴ洢��ID�ֶ���
     * 
     * @return ID�ֶ���
     */
    public String getIdFieldName() {
        return Appraisal.DB_ID_NAME;
    }

    /**
     * ȡ����Ԫ����
     * 
     * @return ����Ԫ����
     */
    public Class getElementClass() {
        return Appraisal.class;
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
     * @return ָ�����󼯺ϣ�Appraisals��
     * @throws WCMException
     *             ����ȡ����ʧ�ܣ����׳��쳣��
     */
    public final static Appraisals findByIds(User _currUser, String _sIds) {
        Appraisals currAppraisals = createNewInstance(_currUser);
        //���ID����Ч��
        if (_sIds == null || _sIds.length() <= 0) {
            return currAppraisals;
        }

        currAppraisals.addElement(_sIds);

        //��ȡָ��ID�Ķ���
        return currAppraisals;
    }//END: findById()

    /**
     * ͨ��ָ��һ��Filter��ȡ��ǰ����[Appraisals]
     * 
     * @param _filter
     *            ָ����Filter
     * @return ��ǰ����[Appraisals]
     * @throws WCMException
     */
    public final static Appraisals openWCMObjs(User _currUser,
            WCMFilter _filter) throws WCMException {
        Appraisals currAppraisals = createNewInstance(_currUser);
        currAppraisals.open(_filter);
        return currAppraisals;
    }

    /**
     * ������ǰ���϶���[Appraisals]��ʵ��
     * 
     * @param _currUser
     *            ��ǰ�����û�
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