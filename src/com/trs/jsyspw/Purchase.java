package com.trs.jsyspw;

/**
 * <p>Title:        TRS WCM</p>
 * <p>Copyright:    Copyright (c) 2004</p>
 * <p>Company:      www.trs.com.cn</p>
 * @author			wangjiang
 * @copyright		www.trs.com.cn
 * @created by		XWCMAutoTool 2.12
 * @version			5.2
 *
 * <p>Created:         2014/10/31 10:06:25</p>
 * <p>Last Modified:   2014/10/31 13:44:25</p>
 * <p>Description:
 *      class Purchase ���� Purchase����Ķ����ʵ��</p>
 * <p>Update Logs:
 *		[1] wangjiang@2014/10/31 10:06:25 ��������
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

public class Purchase extends CMSObj{

    /** �������ͱ�� */
    public final static int     OBJ_TYPE      = 512156927;

    /** �������ݴ洢�����ݿ��� */
    public final static String  DB_TABLE_NAME = "XWCMPURCHASE";

	/** �������ݴ洢��ID�ֶ��� */
    public final static String  DB_ID_NAME    = "PURCHASEID";

    /** ���캯��������Ĭ�Ͻӿ� */
    public Purchase(){
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
  * ��ȡ���ԣ�Purtitle
   * @return  Purtitle
   */
  public String getPurtitle(){
       return this.getPropertyAsString("PURTITLE");   
}

  /**
   * �������ԣ�Purtitle
   * @param	_sPurtitle ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPurtitle( String _sPurtitle ) throws WCMException{
      return this.setProperty("PURTITLE", _sPurtitle ); 
  }

 /**
  * ��ȡ���ԣ�Purnum
   * @return  Purnum
   */
  public int getPurnum(){
       return this.getPropertyAsInt("PURNUM",0);   
}

  /**
   * �������ԣ�Purnum
   * @param	_nPurnum ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPurnum( int _nPurnum ) throws WCMException{
      return this.setProperty("PURNUM", _nPurnum ); 
  }

 /**
  * ��ȡ���ԣ�Purtype
   * @return  Purtype
   */
  public String getPurtype(){
       return this.getPropertyAsString("PURTYPE");   
}

  /**
   * �������ԣ�Purtype
   * @param	_sPurtype ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPurtype( String _sPurtype ) throws WCMException{
      return this.setProperty("PURTYPE", _sPurtype ); 
  }

 /**
  * ��ȡ���ԣ�Purpricelow
   * @return  Purpricelow
   */
  public int getPurpricelow(){
       return this.getPropertyAsInt("PURPRICE",0);   
}

  /**
   * �������ԣ�Purpricelow
   * @param	_nPurpricelow ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPurpricelow( int _nPurpricelow ) throws WCMException{
      return this.setProperty("PURPRICE", _nPurpricelow ); 
  }

 /**
  * ��ȡ���ԣ�Purdesc
   * @return  Purdesc
   */
  public String getPurdesc(){
       return this.getPropertyAsString("PURDESC");   
}

  /**
   * �������ԣ�Purdesc
   * @param	_sPurdesc ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPurdesc( String _sPurdesc ) throws WCMException{
      return this.setProperty("PURDESC", _sPurdesc ); 
  }

 /**
  * ��ȡ���ԣ�Purovertime
   * @return  Purovertime
   */
  public CMyDateTime getPurovertime(){
       return (CMyDateTime)this.getProperty("PUROVERTIME");   
}

  /**
   * �������ԣ�Purovertime
   * @param	_dtPurovertime ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPurovertime( CMyDateTime _dtPurovertime ) throws WCMException{
      return this.setProperty("PUROVERTIME", _dtPurovertime ); 
  }

 /**
  * ��ȡ���ԣ�Contact
   * @return  Contact
   */
  public String getContact(){
       return this.getPropertyAsString("CONTACT");   
}

  /**
   * �������ԣ�Contact
   * @param	_sContact ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setContact( String _sContact ) throws WCMException{
      return this.setProperty("CONTACT", _sContact ); 
  }

 /**
  * ��ȡ���ԣ�Contactphone
   * @return  Contactphone
   */
  public String getContactphone(){
       return this.getPropertyAsString("CONTACTPHONE");   
}

  /**
   * �������ԣ�Contactphone
   * @param	_sContactphone ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setContactphone( String _sContactphone ) throws WCMException{
      return this.setProperty("CONTACTPHONE", _sContactphone ); 
  }

 /**
  * ��ȡ���ԣ�Email
   * @return  Email
   */
  public String getEmail(){
       return this.getPropertyAsString("EMAIL");   
}

  /**
   * �������ԣ�Email
   * @param	_sEmail ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setEmail( String _sEmail ) throws WCMException{
      return this.setProperty("EMAIL", _sEmail ); 
  }

 /**
  * ��ȡ���ԣ�Purpricehigh
   * @return  Purpricehigh
   */
  public int getPurpricehigh(){
       return this.getPropertyAsInt("PURPRICEHIGH",0);   
}

  /**
   * �������ԣ�Purpricehigh
   * @param	_nPurpricehigh ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPurpricehigh( int _nPurpricehigh ) throws WCMException{
      return this.setProperty("PURPRICEHIGH", _nPurpricehigh ); 
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
			
 if( getProperty("PURTITLE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Purtitleû������(Purchase.isValid)"); 
             }
 if( getProperty("PURNUM")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Purnumû������(Purchase.isValid)"); 
             }
 if( getProperty("PURTYPE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Purtypeû������(Purchase.isValid)"); 
             }
 if( getProperty("PURPRICE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Purpricelowû������(Purchase.isValid)"); 
             }
 if( getProperty("PURDESC")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Purdescû������(Purchase.isValid)"); 
             }
 if( getProperty("PUROVERTIME")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Purovertimeû������(Purchase.isValid)"); 
             }
 if( getProperty("CONTACT")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Contactû������(Purchase.isValid)"); 
             }
 if( getProperty("CONTACTPHONE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Contactphoneû������(Purchase.isValid)"); 
             }
 if( getProperty("EMAIL")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Emailû������(Purchase.isValid)"); 
             }
 if( getProperty("PURPRICEHIGH")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Purpricehighû������(Purchase.isValid)"); 
             }
        }
        else{  //�༭ģʽ����������ʱ���Ѿ�����У�飡
            if( ! this.isModified()){
                throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_MODIFIED,
					"��������û�и���(Purchase.isValid)" );
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
    public final static Purchase findById(int _nId) throws WCMException {
        //���ID����Ч��
        if (_nId <= 0) {
            return null;
        }

        //��ȡָ��ID�Ķ���
        return (Purchase) BaseObj.findById(Purchase.class, _nId);

    }//END: findById()

    /**
     * ������ǰ����[Purchase]��ʵ��
     * 
     * @return ��ǰ�����ʵ��[Purchase]
     * @throws WCMException
     */
    public final static Purchase createNewInstance() throws WCMException {
        return (Purchase) BaseObj.createNewInstance(Purchase.class);
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
    public final static Purchase findByKey(Object _oKey) throws WCMException {
        return (Purchase) BaseObj.findByKey(Purchase.class, _oKey);
    }


}