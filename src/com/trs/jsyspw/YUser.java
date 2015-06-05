package com.trs.jsyspw;

/**
 * <p>Title:        TRS WCM</p>
 * <p>Copyright:    Copyright (c) 2004</p>
 * <p>Company:      www.trs.com.cn</p>
 * @author			trs wcm
 * @copyright		www.trs.com.cn
 * @created by		XWCMAutoTool 2.12
 * @version			5.2
 *
 * <p>Created:         2015/5/27 17:36:05</p>
 * <p>Last Modified:   2015/5/27 17:51:46</p>
 * <p>Description:
 *      class YUser ���� YUser����Ķ����ʵ��</p>
 * <p>Update Logs:
 *		[1] trs wcm@2015/5/27 17:36:05 ��������
 *		[2] 
 */

import com.trs.cms.auth.persistent.User;
import com.trs.cms.content.CMSObj;
import com.trs.infra.common.WCMException;
import com.trs.infra.persistent.BaseObj;
import com.trs.infra.util.ExceptionNumber;
import com.trs.infra.util.database.CDBText;

import com.trs.infra.util.*;
import com.trs.infra.util.database.*;

public class YUser extends CMSObj{

    /** �������ͱ�� */
    public final static int     OBJ_TYPE      = 35009370;

    /** �������ݴ洢�����ݿ��� */
    public final static String  DB_TABLE_NAME = "XWCMYUSER";

	/** �������ݴ洢��ID�ֶ��� */
    public final static String  DB_ID_NAME    = "YUSERID";

    /** ���캯��������Ĭ�Ͻӿ� */
    public YUser(){
        super();
    }

//==============================================================================
//���ظ����еĳ���ӿں���

    /**
     * ȡ�������ݴ洢�����ݱ�����
     * @return �������ݴ洢�����ݱ�����
     */
    public String getDbTableName(){
        return DB_TABLE_NAME;
    }

    /**
     * ȡ�������ݴ洢��ID�ֶ���
     * @return  ID�ֶ���
     */
    public String getIdFieldName(){
        return DB_ID_NAME;
    }

    /**
     * ȡ�øö�������ͱ��
     * @return ��������ͱ��
     */
    public int getWCMType(){
        return OBJ_TYPE;
    }

//==============================================================================
//���Զ�д����


 /**
  * ��ȡ���ԣ�Username
   * @return  Username
   */
  public String getUsername(){
       return this.getPropertyAsString("USERNAME");   
}

  /**
   * �������ԣ�Username
   * @param	_sUsername ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setUsername( String _sUsername ) throws WCMException{
      return this.setProperty("USERNAME", _sUsername ); 
  }

 /**
  * ��ȡ���ԣ�Password
   * @return  Password
   */
  public String getPassword(){
       return this.getPropertyAsString("PASSWORD");   
}

  /**
   * �������ԣ�Password
   * @param	_sPassword ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPassword( String _sPassword ) throws WCMException{
      return this.setProperty("PASSWORD", _sPassword ); 
  }

 /**
  * ��ȡ���ԣ�Nickname
   * @return  Nickname
   */
  public String getNickname(){
       return this.getPropertyAsString("NICKNAME");   
}

  /**
   * �������ԣ�Nickname
   * @param	_sNickname ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setNickname( String _sNickname ) throws WCMException{
      return this.setProperty("NICKNAME", _sNickname ); 
  }

 /**
  * ��ȡ���ԣ�Sex
   * @return  Sex
   */
  public String getSex(){
       return this.getPropertyAsString("SEX");   
}

  /**
   * �������ԣ�Sex
   * @param	_sSex ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setSex( String _sSex ) throws WCMException{
      return this.setProperty("SEX", _sSex ); 
  }

 /**
  * ��ȡ���ԣ�Satatus
   * @return  Satatus
   */
  public int getSatatus(){
       return this.getPropertyAsInt("SATATUS",0);   
}

  /**
   * �������ԣ�Satatus
   * @param	_nSatatus ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setSatatus( int _nSatatus ) throws WCMException{
      return this.setProperty("SATATUS", _nSatatus ); 
  }

  /** ���ԣ�CrUser  �����û�
   *  �ɸ���WCMObj�ṩ�ӿ�֧�֡� 
   */

  /** ���ԣ�CrTime ����ʱ��
   *  �ɸ���WCMObj�ṩ�ӿ�֧�֡� 
   */


//==============================================================================
//���ݿ����

    /**
     * �������������Ч��
     * @return ����������������Ч���򷵻�true�����򷵻�false.
     * @throws WCMException  �����������ò�������������ֵ����ȷ��������ظ������׳��쳣��
     */
    public boolean isValid() throws WCMException{
        if( isAddMode() ){
			//���ǿ������Ƿ�����
			
        }
        else{  //�༭ģʽ����������ʱ���Ѿ�����У�飡
            if( ! this.isModified()){
                throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_MODIFIED,
					"��������û�и���(YUser.isValid)" );
            }
        }//end if

		return true;
    }//END: isValid()


    /**
     * ����������д�����ݿ�
     * @param _currUser  ��ǰ�����û�
     * @throws WCMException  д������ʧ�ܣ����׳��쳣��
     */
    public void insert( User _currUser ) throws WCMException{
        if ( isAddMode() && this.isModified() ){
			//�������Ե�ȱʡֵ
			


            super.insert( _currUser );  //insert into Db
        }//end if
    }

    //==============================================================================
    //�߼�����

    /**
     * ��ȡָ��ID�Ķ���
     * 
     * @param _nId
     *            ָ���Ķ���ID
     * @return ���ҵ�ָ��ID�Ķ����򷵻ض���ʵ�壻���򣬷���null��
     * @throws WCMException
     *             ����ȡ����ʧ�ܣ����׳��쳣��
     */
    public final static YUser findById(int _nId) throws WCMException {
        //���ID����Ч��
        if (_nId <= 0) {
            return null;
        }

        //��ȡָ��ID�Ķ���
        return (YUser) BaseObj.findById(YUser.class, _nId);

    }//END: findById()

    /**
     * ������ǰ����[YUser]��ʵ��
     * 
     * @return ��ǰ�����ʵ��[YUser]
     * @throws WCMException
     */
    public final static YUser createNewInstance() throws WCMException {
        return (YUser) BaseObj.createNewInstance(YUser.class);
    }

    /**
     * ��ȡָ��������Key�Ķ���
     * 
     * @param _oKey
     *            ָ����������Key
     * @return ���ҵ�������Key�Ķ����򷵻ض���ʵ�壻���򣬷���null��
     * @throws WCMException
     *             ����ȡ����ʧ�ܣ����׳��쳣��
     */
    public final static YUser findByKey(Object _oKey) throws WCMException {
        return (YUser) BaseObj.findByKey(YUser.class, _oKey);
    }


}